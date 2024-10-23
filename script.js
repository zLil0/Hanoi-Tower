let towerL = []
let towerM = [
  { id: 'd6', size: 6 },
  { id: 'd5', size: 5 },
  { id: 'd4', size: 4 },
  { id: 'd3', size: 3 },
  { id: 'd2', size: 2 },
  { id: 'd1', size: 1 }
]
let towerR = []
let moveCount = 0
const moves = document.getElementById('count')

const towerArray = (towerId) => {
  switch (towerId) {
    case 'left': return towerL
    case 'middle': return towerM
    case 'right': return towerR
  }
}

const align = (towerId) => {
  let tower = towerArray(towerId)
  if (tower.length >= 1) {
    tower.map((disc, i) => {
      const d = document.getElementById(disc.id)
      d.style.bottom = (50 * i) + "px"
      d.style.transition = ".7s ease-in-out"
    })
  }
}
align('middle')

let holding = false
let holdingDisc
let prevTowerId
const pickup = (towerId) => {
  const tower = towerArray(towerId)
  prevTowerId = towerId
  if (tower.length > 0) {
    holdingDisc = tower[tower.length - 1]
    const disc = document.getElementById(holdingDisc.id)
    disc.style.bottom = 345 + "px"
    holding = true
  }
}

const put = (towerId) => {
  holding = false
  const t = document.getElementById(towerId)
  const disc = document.getElementById(holdingDisc.id)
  if(towerArray(towerId).length === 0 || holdingDisc.size < towerArray(towerId).at(-1).size){
    t.appendChild(disc)
    towerArray(prevTowerId).pop()
    towerArray(towerId).push(holdingDisc)
    disc.style.bottom = 345 + "px"
    setTimeout(() => align(towerId), 10)
    moveCount++
    moves.innerHTML = moveCount
    winDetection()
  }
  else{
    setTimeout(() => align(prevTowerId), 10)
  }
}

const action = (towerId) => {
  if (holding) {
    put(towerId)
  }
  else {
    pickup(towerId)
  }
}

const winDetection = () => {
  if(towerL.length === 6 || towerR.length === 6){
    document.querySelector("#protection").style.display = "flex"
    setTimeout(() => {document.querySelector("#win-window").style.transform = "scaleX(1)"}, 50)
  }
}