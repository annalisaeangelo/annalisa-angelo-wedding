const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');
const envelopeStage = document.getElementById('envelopeStage');
const invitationCard = document.getElementById('invitationCard');
const reveal = document.getElementById('reveal');
const inviteImage = document.getElementById('inviteImage');
const viewInviteBtn = document.getElementById('viewInviteBtn');
const inviteLightbox = document.getElementById('inviteLightbox');
const lightboxClose = document.getElementById('lightboxClose');

let envelopeVisible = false;
let invitationOpened = false;

function scrollToElement(element, offset = 18){
  if (!element) return;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function showEnvelope(){
  if (!reveal) return;

  envelopeVisible = true;
  reveal.classList.add('visible');
  openBtn?.setAttribute('aria-expanded', 'true');

  window.requestAnimationFrame(() => {
    reveal.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function openInvitation(){
  if (!envelopeVisible) {
    showEnvelope();
    return;
  }

  if (invitationOpened) return;
  invitationOpened = true;

  envelope.classList.add('opened');

  setTimeout(() => {
    reveal?.classList.add('invitation-opened');
    envelopeStage.classList.add('hide');
    invitationCard.classList.add('show');

    // Non scendere più verso il basso: porta la vista esattamente sull'immagine dell'invito.
    setTimeout(() => {
      scrollToElement(inviteImage || invitationCard, 14);
    }, 120);
  }, 950);
}

function openLightbox(){
  if (!inviteLightbox) return;
  inviteLightbox.classList.add('show');
  inviteLightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');
}

function closeLightbox(){
  if (!inviteLightbox) return;
  inviteLightbox.classList.remove('show');
  inviteLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
}

openBtn?.addEventListener('click', showEnvelope);
envelope?.addEventListener('click', openInvitation);
envelope?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});

inviteImage?.addEventListener('click', openLightbox);
viewInviteBtn?.addEventListener('click', openLightbox);
lightboxClose?.addEventListener('click', closeLightbox);
inviteLightbox?.addEventListener('click', (e) => {
  if (e.target === inviteLightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

const weddingDate = new Date('2026-09-26T10:30:00+02:00').getTime();
function updateCountdown(){
  const diff = Math.max(0, weddingDate - Date.now());
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
}
updateCountdown();
setInterval(updateCountdown, 1000);
