
const mdContent = document.getElementById('content');
window.onload = async () => {
    // 準備を待つ
    await markdown.ready;

    

    // 初期ロード時
    const renderedHtml = markdown.parse(mdContent.value);
    const modalBody = document.getElementById('modal-body') 
    modalBody.innerHTML = renderedHtml
}

// 入力時
mdContent.oninput = () => {
    const renderedHtml = markdown.parse(mdContent.value);
    const modalBody = document.getElementById('modal-body') 
    modalBody.innerHTML = renderedHtml
}