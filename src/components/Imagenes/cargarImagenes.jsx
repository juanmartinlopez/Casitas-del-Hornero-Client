//?---------------------------- IMPORTS --------------------------------
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

//?----------------- COMPONENTE UPLOAD IMAGE ------------------------------------
const UploadImage = () => {
  const [image, setImage] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [loading, setLoading] = useState(false);

  const idioma = useSelector((state) => state.idioma);

  const translations = {
    en: {
      SubirImagen: "Upload image",
      Arrastra: "drag image here",
    },
    es: {
      SubirImagen: "Subir imagen",
      Arrastra: "arrastra la imagen aquí",
    },
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "La_Casita_Del_Hornero");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhe1t8gs0/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    await imagenes.push({
      id: file.public_id,
      url: file.secure_url,
    });
    setLoading(false);
  };

  const deleteImage = async (id) => {
    const idString = id.split("/");
    const ID = idString[idString.length - 1];
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dhe1t8gs0/image/destroy/${id}`,
      {
        method: "DELETE",
      }
    );
    setImagenes(imagenes.filter((imagen) => url !== imagen.url));
    console.log("Imagen eliminada");
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        placeholder={translations[idioma].Arrastra}
        onChange={uploadImage}
      />
      {loading ? (
        <></>
      ) : imagenes.length ? (
        imagenes.map((imagen) => {
          return (
            <>
              <img src={imagen.url} style={{ width: "300px" }} />
              <button onClick={() => deleteImage(imagen.id)}>X</button>
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default UploadImage;
