import Axios from "axios";

const commentList = document.getElementById('jsCommentList');

const sendComment = async(el) => {
  const commentId = el.target.dataset.id;
  const response = await Axios({
    method: 'POST',
    url: `/api/${commentId}/deleteComment`
  });
  if (response.status === 200) {
    const comment = el.target.parentNode;
    comment.remove();
  }
}

const init = btn => {
  btn.addEventListener('click', sendComment);
}

if (commentList) {
  const listItems = Array.from(commentList.querySelectorAll('li'));
  listItems.forEach(item => {
    const delBtn = item.querySelector('.jsDelCommentBtn');
    if (delBtn) {
      init(delBtn);
    }
  });
}