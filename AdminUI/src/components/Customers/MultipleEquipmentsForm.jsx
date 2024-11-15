import React from "react";

const equipmentType = [
  "Van",
  "Reefer",
  "Flatbed",
  "Triaxle",
  "Maxi",
  "Btrain",
  "Roll tite",
];

function MultipleEquipmentsForm({ customer, setCustomer }) {
  const handleAddEquipment = () => {
    setCustomer((prev) => ({
      ...prev,
      multipleEquipments: [...prev.multipleEquipments, { type: "" }],
    }));
  };

  const handleRemoveEquipment = (index) => {
    setCustomer((prev) => ({
      ...prev,
      multipleEquipments: prev.multipleEquipments.filter((_, i) => i !== index),
    }));
  };

  const handleEquipmentChange = (index, e) => {
    const { value } = e.target;
    const updatedEquipments = customer.multipleEquipments.map((equipment, i) =>
      i === index ? { ...equipment, type: value } : equipment
    );
    setCustomer((prev) => ({ ...prev, multipleEquipments: updatedEquipments }));
  };

  return (
    <fieldset>
      <legend>Multiple Equipments</legend>
      {customer.multipleEquipments.map((equipment, index) => (
        <div key={index} className="equipment-entry">
          <div className="form-group">
            <label htmlFor={`equipment-${index}`}>Equipment</label>
            <select
              value={equipment.type}
              onChange={(e) => handleEquipmentChange(index, e)}
            >
              <option value="">Select...</option>
              {equipmentType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => handleRemoveEquipment(index)}
            className="remove"
          >
            Remove Equipment
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddEquipment} className="add">
        Add Equipment
      </button>
    </fieldset>
  );
}

export default MultipleEquipmentsForm;
