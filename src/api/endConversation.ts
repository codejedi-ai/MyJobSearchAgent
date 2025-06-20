export const endConversation = async (
  token: string,
  conversationId: string,
) => {
  try {
    console.log('Ending conversation:', conversationId);
    
    const response = await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: "POST",
        headers: {
          "x-api-key": token ?? "",
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tavus API error ending conversation:', response.status, errorText);
      throw new Error(`Failed to end conversation: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Conversation ended successfully:', data);
    return data;
  } catch (error) {
    console.error("Error ending conversation:", error);
    throw error;
  }
};