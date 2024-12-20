import { useContext, useState } from 'react';
import { UserContext } from '../../../UserProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../../styles/Form.css';
import ShipmentDetails from './ShipmentDetails';

const AddShipmentForm = ({ onClose, onAddShipment }) => {
  const { currentUser } = useContext(UserContext);
  const [shipment, setShipment] = useState({
    id: '',
    ship_load_date: '',
    ship_pickup_location: '',
    ship_delivery_location: '',
    ship_driver: '',
    ship_weight: '',
    ship_ftl_ltl: '',
    ship_tarp: '',
    ship_equipment: '',
    ship_price: '',
    ship_notes: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response;
      const token = localStorage.getItem('token');

      if (!token) {
        Swal.fire('Error', 'No token found', 'error');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (shipment.id) {
        response = await axios.put(`http://127.0.0.1:8000/api/shipment/${shipment.id}`, shipment, { headers });
        Swal.fire('Updated!', 'Lead data has been updated successfully.', 'success');
      } else {
        response = await axios.post('http://127.0.0.1:8000/api/shipment', shipment, {
          headers,
        });
        Swal.fire('Saved!', 'Lead data has been saved successfully.', 'success');
      }

      onAddShipment(response.data);
      clearShipmentForm();
      onClose();
    } catch (error) {
      console.error('Error saving/updating shipment:', error.response ? error.response.data : error.message);
      Swal.fire('Error', 'An error occurred while saving/updating the lead.', 'error');
    }
  };

  const clearShipmentForm = () => {
    setShipment({
      id: '',
      ship_load_date: '',
      ship_pickup_location: '',
      ship_delivery_location: '',
      ship_driver: '',
      ship_weight: '',
      ship_ftl_ltl: '',
      ship_tarp: '',
      ship_equipment: '',
      ship_price: '',
      ship_notes: '',
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-main">
        <ShipmentDetails shipment={shipment} setShipment={setShipment} />

        <div className="submit-button-container">
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShipmentForm;
