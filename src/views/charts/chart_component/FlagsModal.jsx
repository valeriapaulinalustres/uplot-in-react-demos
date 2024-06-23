import { useState } from "react";



export default function FlagsModal({
  actualXselected,
  coordinatesSelectedUpper,
  setCoordinatesSelectedUpper,
  setModalFlagsOn,
}) {
  const [flagColor, setFlagColor] = useState("");
  const [detail, setDetail] = useState(""); //Guada lo escrito en el input detail

  function handleSubmitFlagData(e) {
    e.preventDefault();

    console.log(
      "handle",
      flagColor,

      detail
    );
    //Se crea el nuevo objeto con los valores seleccionados en la ventana
    const newObj = {
      x: actualXselected,
      color: flagColor,
      label: detail,
      type: "flag",
    };

    console.log("newobj", newObj);

    //se crea copia de coordinatesSelectedUpper, que tiene todos los objetos, y se le pushea este último
    const coordinatesSelectedCopy = coordinatesSelectedUpper.slice();
    coordinatesSelectedCopy.push(newObj);

    //Se ordena el nuevo array de objetos según el valor de las x
    coordinatesSelectedCopy.sort((a, b) => a.x - b.x);

    setCoordinatesSelectedUpper(coordinatesSelectedCopy);

    //Reseteo
    setDetail("");
    setFlagColor("");
    setModalFlagsOn(false);
  }

  function handleClose() {
    setDetail("");
    setFlagColor("");
    setModalFlagsOn(false);
  }

  //Detiene la propagación del evento de presionar una tecla en el input para que no se ejecuten los eventos del chart (flag, npt, alarm, warning)
  const handleInputKeyDown = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      <div className='windowHeader'>
      
   
          <h4 className='titleTextAnnotations'>Flags</h4>
        <div className='closeIconAnnotation' onClick={handleClose}>X</div>
        

      </div>
      <form className='windowText' onSubmit={handleSubmitFlagData}>
        <div className='inputsContainerAddModal'>
          <div className='labelAndInputContainer'>
            <label>Name</label>
            <textarea
              type="text"
              className='inputFlagModal'
              onChange={(e) => setDetail(e.target.value)}
              onKeyDown={handleInputKeyDown}
              required
            />
          </div>

          <div className='labelAndInputContainer'>
            <label>Color</label>
            <input
              type="color"
              className='inputFlagModal'
              onChange={(e) => setFlagColor(e.target.value)}
              onKeyDown={handleInputKeyDown}
              required
            />
          </div>
        </div>

        <button className='button' type="submit">
          Save
        </button>
      </form>
    </>
  );
}
