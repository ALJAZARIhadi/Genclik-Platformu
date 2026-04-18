import React, { useState } from 'react';
import axios from 'axios';

function AdminAddScholar() {
  const [formData, setFormData] = useState({
    nameTr: '',
    titleTr: '',
    image: '',
    bioTr: '',
    tagsTr: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تحويل التخصصات من نص إلى مصفوفة
    const dataToSend = {
      ...formData,
      tagsTr: formData.tagsTr.split(',').map(tag => tag.trim())
    };

    try {
      await axios.post('http://localhost:5000/api/scholars', dataToSend);
      setMessage('✅ Bilgin başarıyla eklendi!');
      setFormData({ nameTr: '', titleTr: '', image: '', bioTr: '', tagsTr: '' });
    } catch (error) {
      setMessage('❌ Bir hata oluştu!');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Yeni Bilgin Ekle</h2>
      
      {message && <div style={styles.message}>{message}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Ad Soyad</label>
        <input name="nameTr" value={formData.nameTr} onChange={handleChange} required style={styles.input} placeholder="Örn: İbn-i Sina" />

        <label style={styles.label}>Unvan</label>
        <input name="titleTr" value={formData.titleTr} onChange={handleChange} style={styles.input} placeholder="Örn: Tıbbın Üstadı" />

        <label style={styles.label}>Fotoğraf Linki (URL)</label>
        <input name="image" value={formData.image} onChange={handleChange} required style={styles.input} placeholder="https://..." />

        <label style={styles.label}>Kısa Biyografi</label>
        <textarea name="bioTr" value={formData.bioTr} onChange={handleChange} style={styles.textarea} placeholder="Bilgin hakkında kısa bilgi..."></textarea>

        <label style={styles.label}>Uzmanlık Alanları (Virgül ile ayırın)</label>
        <input name="tagsTr" value={formData.tagsTr} onChange={handleChange} style={styles.input} placeholder="Tıp, Felsefe, Astronomi" />

        <button type="submit" style={styles.submitBtn}>Kaydet</button>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '500px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
  title: { textAlign: 'center', color: '#333' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', background: '#f9f9f9', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  label: { fontWeight: 'bold', fontSize: '14px', color: '#555' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd' },
  textarea: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '80px' },
  submitBtn: { padding: '12px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
  message: { padding: '10px', marginBottom: '10px', borderRadius: '5px', textAlign: 'center', backgroundColor: '#e8f5e9', color: '#2e7d32' }
};

export default AdminAddScholar;