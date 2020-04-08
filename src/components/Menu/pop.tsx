import React from 'react';

interface PopProps {
  child: React.ReactNode
}
const Pop:React.FC<PopProps> = (props) => {
  const { child } = props
  return (
    <ul className="Pop-itemGroup">
      {child}
    </ul>
  )
}

export default Pop;