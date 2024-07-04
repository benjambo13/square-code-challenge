import { Shape } from './Shape'

const BOX_DATA = [
  [1,1,1],
  [1,0,0],
  [1,1,1]
]

export const App = () => {
  return (
    <main>
      <Shape data={BOX_DATA} />
    </main>
  )
}
