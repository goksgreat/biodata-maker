import db from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
const collection_name = "biodata";
const config_collection_name = "config";
const storage = getStorage();

const getAll = async () => {
  const querySnapshot = await getDocs(collection(db, collection_name));
  return querySnapshot;
};

const uploadImg = async (dataURI, id) => {
  try {
    const storageRef = ref(storage, `${id}.png`);
    const snapshot = await uploadString(storageRef, dataURI, "data_url");
    return snapshot;
  } catch (err) {
    console.log(err);
  }
};

const getImg = async (id) => {
  try {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, `${id}.png`));
    return url;
  } catch (err) {
    return null;
  }
};

const uploadAndDownload = async (dataURI, id) => {
  try {
    await uploadImg(dataURI, id);
    const url = await getImg(id);
    return url;
  } catch (err) {
    return null;
  }
};

const getConfig = async () => {
  const docRef = doc(db, config_collection_name, "main");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

const create = async (data = {}) => {
  try {
    const docRef = await setDoc(
      doc(db, collection_name, data.SNo || Math.random()),
      data
    );
    const {
      Title = "Title",
      Subtitle = "Subtitle",
      borderColor = "rgb(0, 0, 0)",
      FooterSection = "Important Rules",
      SNo,
    } = data;
    const nextSnoArr = SNo.split('A');
    const nextSno = `A${Number(nextSnoArr[1])+1}`;
    await updateConfig({ Title, Subtitle, borderColor, FooterSection, SNo: nextSno });
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const update = async (id, value) => {
  try {
    const collectionRef = doc(db, collection_name, id);

    const docRef = await updateDoc(collectionRef, value);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const updateConfig = async (value) => {
  try {
    const collectionRef = doc(db, config_collection_name, "main");

    const docRef = await updateDoc(collectionRef, value);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const remove = async (id) => {
  const docRef = await deleteDoc(doc(db, collection_name, id));
  return docRef;
};

const BiodataService = {
  getAll,
  create,
  update,
  remove,
  getConfig,
  uploadImg,
  getImg,
  uploadAndDownload,
};

export default BiodataService;
