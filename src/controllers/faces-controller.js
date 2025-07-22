const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();
const faceService = require("../services/faces-service");

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const result = await faceService.createFace(req.body, req.file);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await faceService.getAllFaces();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const result = await faceService.updateFace(
      req.params.id,
      req.body,
      req.file
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await faceService.deleteFace(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
