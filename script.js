const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');
const envelopeStage = document.getElementById('envelopeStage');
const invitationCard = document.getElementById('invitationCard');
const reveal = document.getElementById('reveal');

function openInvitation(){
  reveal.scrollIntoView({behavior:'smooth', block:'start'});
  envelope.classList.add('opened');
  setTimeout(()=>{
    envelopeStage.classList.add('hide');
    invitationCard.classList.add('show');
    setTimeout(()=>invitationCard.scrollIntoView({behavior:'smooth', block:'start'}), 250);
  }, 950);
}

openBtn?.addEventListener('click', openInvitation);
envelope?.addEventListener('click', openInvitation);
envelope?.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    openInvitation();
  }
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
