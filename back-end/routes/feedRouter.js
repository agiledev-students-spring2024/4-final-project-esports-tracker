// example using hard-coded data
const express = require("express")
const router = express.Router()

const posts = [
  {
    username: "pawsandwhiskers",
    image:
      "https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Snowball on a bed-time journey.",
  },
  {
    username: "petpalpassion",
    image:
      "https://images.unsplash.com/photo-1504595403659-9088ce801e29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Sunny smiles with Luna.",
  },
  {
    username: "snugglepaws123",
    image:
      "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Napping in a cozy spot.",
  },
  {
    username: "fluffylover123",
    image:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Fluffy enjoying a sunny day.",
  },
  {
    username: "furryfriendfanatic",
    image:
      "https://images.unsplash.com/photo-1591382386627-349b692688ff?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caption: "Luna striking a pose."
  },
]

router.get("/feed", (req, res) => {
  res.json(posts)
})

module.exports = router
