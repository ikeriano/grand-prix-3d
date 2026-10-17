import sys, os, wave, subprocess, re, json
sys.path.insert(0,'.')
from piper import PiperVoice, SynthesisConfig
src = open('/workspace/grandprix/src/lines.js').read()
items = re.findall(r"(\w+): \['(host|co)', '((?:[^'\\]|\\.)*)'\]", src)
V = {'host': PiperVoice.load('/workspace/piper_models/es_ES-davefx-medium.onnx'), 'co': PiperVoice.load('/workspace/piper_models/es_ES-sharvard-medium.onnx')}
out = '/workspace/grandprix/assets/voz/'; n = 0
for k, who, t in items:
    f = out + k + '.mp3'
    if os.path.exists(f): continue
    wav = f'/tmp/gp_{k}.wav'
    with wave.open(wav, 'wb') as w: V[who].synthesize_wav(t.replace('Grand Prix','Gran Pri').replace('tres D','tres de'), w, syn_config=SynthesisConfig(length_scale=0.95))
    subprocess.run(['ffmpeg','-v','error','-y','-i',wav,'-ac','1','-ar','22050','-af','loudnorm=I=-16:TP=-1.5','-b:a','32k',f], check=True); os.remove(wav); n += 1
print('done', n, len(items))
