let cards = document.querySelectorAll('.card');
let lists = document.querySelectorAll('.list');

cards.forEach((card)=>{
  registerEventOnCard(card);
});

lists.forEach((list)=> {
  list.addEventListener('touchmove', (e)=>{
    e.preventDefault();

    const draggingCard = document.querySelector('.dragging');
    
    const cardAfterDraggingCard = getCardAfterDraggingCard(list, e.changedTouches[0].clientY);
    console.log(cardAfterDraggingCard)
    
    if(cardAfterDraggingCard){
      cardAfterDraggingCard.parentNode.insertBefore(draggingCard, cardAfterDraggingCard);
    }else{
      
      list.appendChild(draggingCard);
    }
  });
});

function getCardAfterDraggingCard(list, yDraggingCard){
  const listCards = [...list.querySelectorAll('.card:not(.dragging)')];

  return listCards.find((sibling) => {
    return yDraggingCard <= sibling.offsetTop + sibling.offsetHeight / 2;
  })
}

function registerEventOnCard(card){
  card.addEventListener('touchstart', () => {
    card.classList.add("dragging");
  });

  card.addEventListener("touchend", () => {
		card.classList.remove("dragging");
  });
}