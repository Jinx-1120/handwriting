
const ClockView = () => {
  const [num, setNum] = useState(0)
  const [isStart, setStart] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (isStart) {
      timer.current = setInterval(() => {
        setNum(val => {
          if (val === 1) clearTimer
          return val - 1
        })
      }, 1000)
    }
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [isStart])

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    setStart(false)
  }

  return (
    <div>
      <p>{num}</p>
      <button disabled={isStart} onClick={() => setStart(true)}>开始</button>
      <button onClick={clearTimer}>清除</button>
    </div>
  )
}

export default ClockView