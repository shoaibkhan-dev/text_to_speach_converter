let speech = new SpeechSynthesisUtterance();
    let voices = [];
    const voiceSelect = document.querySelector("select");

    function populateVoices() {
      voices = window.speechSynthesis.getVoices();
      voiceSelect.innerHTML = '';
      voices.forEach((voice, i) => {
        const option = new Option(voice.name + " (" + voice.lang + ")", i);
        voiceSelect.add(option);
      });

      if (voices.length > 0) {
        speech.voice = voices[0];
      }
    }

    populateVoices();
    if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoices;
    }

    voiceSelect.addEventListener("change", () => {
      speech.voice = voices[voiceSelect.value];
    });

    document.querySelector("button").addEventListener("click", () => {
      speech.text = document.querySelector("textarea").value;
      window.speechSynthesis.speak(speech);
    });