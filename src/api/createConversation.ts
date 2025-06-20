import { IConversation } from "@/types";

export const createConversation = async (
  token: string,
): Promise<IConversation> => {
  const payload = {
    "replica_id": "r79e1c033f",
    "persona_id": "p5317866",
    "callback_url": "https://yourwebsite.com/webhook",
    "conversation_name": "A Meeting with Hassaan",
    "conversational_context": "You are about to talk to Hassaan, one of the cofounders of Tavus. He loves to talk about AI, startups, and racing cars.",
    "custom_greeting": "Hey there Hassaan, long time no see!",
    "properties": {
      "max_call_duration": 3600,
      "participant_left_timeout": 60,
      "participant_absent_timeout": 300,
      "enable_recording": true,
      "enable_closed_captions": true,
      "apply_greenscreen": true,
      "language": "english",
      "recording_s3_bucket_name": "conversation-recordings",
      "recording_s3_bucket_region": "us-east-1",
      "aws_assume_role_arn": ""
    }
  };
  
  console.log('Creating conversation with payload:', payload);
  
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token ?? "",
    },
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    const errorText = await response.text();
    console.error('Tavus API error:', response.status, errorText);
    throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log('Tavus API response:', data);
  return data;
};