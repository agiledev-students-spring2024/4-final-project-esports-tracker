const express = require("express")
const router = express.Router()

// hard-coded markers data
const markers = [
  {
    id: 1,
    geocode: [40.7309, -73.9965],
    popUp: "childrens park",
  },
  {
    id: 1,
    geocode: [40.73075, -73.9985],
    popUp: "dog park",
  },
  {
    id: 1,
    geocode: [40.7304, -73.9976],
    popUp: "dog park",
  },
  {
    id: 2,
    geocode: [40.73075, -73.9985],
    popUp: "dog park",
  },
  {
    id: 2,
    geocode: [40.7304, -73.9976],
    popUp: "dog park",
  },
]

router.get("/:id", (req, res) => {
  const { id } = req.params
  // filter markers based on the provided id
  const filteredMarkers = markers.filter((marker) => marker.id == parseInt(id))
  // return 200 with an empty array if no markers are found
  if (filteredMarkers.length === 0) {
    return res.status(200).json([])
  }
  res.json(filteredMarkers)
})

module.exports = router
