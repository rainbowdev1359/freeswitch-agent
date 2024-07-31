// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

const Waveform = ({ audio,setIsPlaying }) => {
  const containerRef = useRef(null)
  const [urlIndex, setUrlIndex] = useState(0)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    url: audioUrls[urlIndex],
    plugins: useMemo(() => [Timeline.create()], []),
  })

  const onUrlChange = useCallback(() => {
    setUrlIndex((index) => (index + 1) % audioUrls.length)
  }, [])

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  return (
    <>
      <div ref={containerRef} />

      <p>Current audio: {audioUrls[urlIndex]}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: '1em 0', display: 'flex', gap: '1em' }}>
        <button onClick={onUrlChange}>Change audio</button>

        <button onClick={onPlayPause} style={{ minWidth: '5em' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  )
}
