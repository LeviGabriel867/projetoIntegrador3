
import React, { useState, useEffect } from 'react';
import './EditOrderModal.css';

const EditOrderModal = ({ order, onClose, onSave }) => {
  const [formData, setFormData] = useState({ mesa: '', descricao: '' });

  useEffect(() => {
    if (order) {
      setFormData({
        mesa: order.mesa,
        descricao: order.descricao,
      });
    }
  }, [order]);

  if (!order) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    onSave(order.id, formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Editar Pedido</h2>
        <form onSubmit={handleSaveChanges}>
          <div className="form-group">
            <label htmlFor="mesa">Mesa</label>
            <input
              type="text"
              id="mesa"
              name="mesa"
              value={formData.mesa}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows="4"
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
            <button type="submit" className="btn-save">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOrderModal;