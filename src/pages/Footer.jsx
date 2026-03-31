import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <h3 style={styles.title}>Miras Platformu ✨</h3>
          <p style={styles.slogan}>İlim, İrade ve Ahlak ile geleceğini inşa et.</p>
        </div>
        
        <div style={styles.bottomBar}>
          <p style={styles.copyText}>
            © {currentYear} Miras. Tüm hakları saklıdır. | <span style={styles.devText}>Sevgiyle Kodlandı 💻</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--card-bg)',
    borderTop: '1px solid var(--shadow)',
    padding: '30px 20px 15px',
    marginTop: '50px', // لضمان وجود مسافة بينه وبين محتوى الصفحة
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  brand: {
    marginBottom: '20px',
  },
  title: {
    color: 'var(--text-main)',
    margin: '0 0 10px 0',
    fontSize: '20px',
    transition: 'color 0.3s ease',
  },
  slogan: {
    color: 'var(--text-sub)',
    margin: '0',
    fontSize: '15px',
    transition: 'color 0.3s ease',
  },
  bottomBar: {
    width: '100%',
    borderTop: '1px solid var(--shadow)',
    paddingTop: '15px',
    marginTop: '10px',
  },
  copyText: {
    color: 'var(--text-sub)',
    fontSize: '13px',
    margin: '0',
    transition: 'color 0.3s ease',
  },
  devText: {
    fontWeight: 'bold',
    color: '#27ae60',
  }
};

export default Footer;