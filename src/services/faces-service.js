const { db, bucket } = require('../firebase-app');

const collectionName = 'tbl_face';

async function uploadImage(file) {
  const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '')}`;
  const fileUpload = bucket.file(`img/${filename}`);

  await fileUpload.save(file.buffer, {
    metadata: { contentType: file.mimetype },
  });

  await fileUpload.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/img/${filename}`;
}

async function createFace(data, file) {
  console.log("🚀 ~ createFace ~ data:", data)
  const imgUrl = file ? await uploadImage(file) : '';

  const faceData = {
    cedula: data.cedula || '',
    fechaNacimiento: data.fechaNacimiento || '',
    imgUrl,
    nombreImagen: file ? file.originalname : '',
    tlfEmergencia: data.tlfEmergencia || '',
  };

  const docRef = await db.collection(collectionName).add(faceData);
  return { id: docRef.id, ...faceData };
}

async function getAllFaces() {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function updateFace(id, data, file) {
  const docRef = db.collection(collectionName).doc(id);
  const updateData = { ...data };

  if (file) {
    const imgUrl = await uploadImage(file);
    updateData.imgUrl = imgUrl;
    updateData.nombreImagen = file.originalname;
  }

  await docRef.update(updateData);
  return { id, ...updateData };
}

async function deleteFace(id) {
  await db.collection(collectionName).doc(id).delete();
  return;
}

module.exports = {
  createFace,
  getAllFaces,
  updateFace,
  deleteFace,
};
