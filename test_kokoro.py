import sounddevice as sd
from kokoro_onnx import Kokoro

print("Init Kokoro...")
k = Kokoro("models/kokoro/kokoro-v0_19.onnx", "models/kokoro/voices.json")
print("Generating audio...")
samples, sample_rate = k.create("Bonjour monsieur, le système de synthèse vocale est opérationnel.", voice="ff_siwis", speed=1.0, lang="fr-fr")
print("Playing audio...")
sd.play(samples, sample_rate)
sd.wait()
print("Done.")
