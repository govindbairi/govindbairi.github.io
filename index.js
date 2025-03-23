
const contactForm = document.querySelector('.contact__form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
      const result = await emailjs.sendForm(
        'service_1w8zytj',
        'template_1d3pnxo',
        contactForm,
        '9fyCjxWfefn_qnS4N'  
      );

      if(result.text === 'OK') {
        contactForm.reset();
        alert('Thank you for your message! I will get back to you soon.');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Oops! There was a problem submitting your form. Please email me directly at govindbairi142@gmail.com');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
}
