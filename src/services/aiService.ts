import { ANON_API_KEY, BASE_URL, DEFAULT_PAYLOAD } from './aiConstants';

/**
 *
 * @param prompt - The prompt to generate an answer for
 * @returns id of the generation
 */
export async function asyncGenerateAnswer(prompt: string): Promise<string | null> {
  const URL = 'v2/generate/text/async';
  const requestToAi = `${DEFAULT_PAYLOAD.prompt}${prompt}\n\n### Response:`;
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      apikey: ANON_API_KEY,
    },
    body: JSON.stringify({
      ...DEFAULT_PAYLOAD,
      prompt: requestToAi,
    }),
  };

  try {
    const response = await fetch(BASE_URL + URL, settings);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const jsonResponse = await response.json();

    // Check if the 'id' field exists in the JSON response
    if ('id' in jsonResponse) {
      return jsonResponse.id;
    }
    console.error('The `id` field is missing in the response:', jsonResponse);
    return null;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}

export async function asyncCheckAnswer(id: string) {
  const URL = `v2/generate/text/status/${id}`;

  try {
    const response = await fetch(BASE_URL + URL);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}

export async function asyncWaitForAnswer(id: string): Promise<{ status: string; answer: string; }> {
  console.log('asyncWaitForAnswer', id);

  const response = await asyncCheckAnswer(id);

  if (response.finished === 1
      || response.done === true
      || response.faulted === true
      || response.is_possible === false) {
    if (response.generations[0]) {
      return { status: 'finished', answer: response.generations[0].text };
    }
  }
  if (response.waiting === 1) {
    return { status: 'waiting', answer: `Waiting for a response. Position is queue is ${response.queue_position}.` };
  }
  if (response.processing === 1) {
    return { status: 'processing', answer: `Response is processing. ETA is ${response.wait_time} seconds.` };
  }

  console.error('Error in generation, no answer found.');
  console.error(response);

  return { status: 'error', answer: 'No answer found.' };
}
