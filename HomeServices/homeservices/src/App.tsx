import { useEffect, useState } from 'react'
import './App.css'
import { LiveAudioVisualizer } from './visualizer/LiveAudioVisualizer'

function App() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  useEffect(() => {
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const recorder = new MediaRecorder(stream)
      setMediaRecorder(recorder)

      // Start recording (required to change state to "recording")
      recorder.start()
    }).catch((err) => {
      console.error('Microphone permission denied or error:', err)
    })
  }, [])

  return (
    <div className="App">
      <h1>Live Audio Visualizer</h1>
      {mediaRecorder && mediaRecorder.state === 'recording' ? (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder}
          width={600}
          height={200}
          barWidth={4}
          gap={2}
          backgroundColor="black"
          barColor="lime"
        />
      ) : (
        <p>Waiting for microphone access...</p>
      )}
    </div>
  )
}

export default App
