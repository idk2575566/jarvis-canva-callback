export default async function handler(request, response) {
  const { code, state, error } = request.query;

  if (error) {
    console.error("Canva returned an error", error);
    return response.status(400).send("Canva authorization failed.");
  }

  if (!code) {
    return response.status(400).send("Missing code from Canva.");
  }

  try {
    const webhookUrl = process.env.JARVIS_CANVA_WEBHOOK;

    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, state }),
      });
    } else {
      console.warn("JARVIS_CANVA_WEBHOOK not set; logging auth code instead.");
      console.info(JSON.stringify({ code, state }));
    }

    return response.status(200).send("Canva auth complete. You can close this tab.");
  } catch (err) {
    console.error("Failed to forward Canva code", err);
    return response.status(500).send("Could not process Canva auth. Please try again.");
  }
}
