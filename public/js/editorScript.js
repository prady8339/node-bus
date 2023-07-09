// console.log("helloooo im working");
tinymce.init({
    selector: 'textarea#editor1',
    width: "100%",
    height: 300,
    Plugins: [
        'advlist', 'autolink', 'link', 'image', 'charmap', 'preview', 'anchore', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'code', 'fullscreen', 'insertdatetime',
        'MediaCapabilities', 'table', 'emoticon', 'template', 'codesample'
    ],
    toolbar: 'undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |' +
        'bullist numlist outdent indnet | link image | print preview media fullscreen|' +
        'forecolor backcolor emoticons',
    menu: {
        favs: { title: 'menu', items: 'code visualaid | searchreplace | emoticons' }
    },
    menubar: 'favs file edit view insert format tools table',
    content_style: 'body{font-family:Helvetica,Arail,sans-sarif,font-size16px}'
});

