/*
=====================================================
  Dr. Botany — PDF Configuration
  সমস্ত PDF ফাইলের লিংক এখানে কেন্দ্রীভূত
  Firebase Storage দিয়ে রিপ্লেস করতে এই ফাইলই পরিবর্তন করবে
=====================================================
*/

const PDFConfig = {

  /* Base path for local PDFs */
  basePath: 'pdfs/',

  /*
   * Firebase Storage কনফিগারেশন (পরবর্তীতে ব্যবহারের জন্য)
   * যখন Firebase কানেক্ট করবে, তখন useFirebase: true করে দিবে
   * এবং firebaseBucket এ তোমার Storage bucket URL দিবে
   */
  useFirebase: false,
  firebaseBucket: 'gs://your-project.appspot.com',

  /* PDF Viewer Configuration */
  viewer: {
    /* 'internal' = সাইটের ভিতরেই PDF দেখাবে */
    /* 'google' = Google Docs Viewer দিয়ে দেখাবে */
    /* 'browser' = ব্রাউজারের ডিফল্ট PDF viewer দিয়ে দেখাবে */
    mode: 'internal',
    googleViewerUrl: 'https://docs.google.com/gview?url=',
  },

  /* PDF URL তৈরি করার ফাংশন */
  getUrl(path) {
    if (this.useFirebase) {
      return `${this.firebaseBucket}/${path}`;
    }
    return `${this.basePath}${path}`;
  },

  /* PDF ভিউ করার ফাংশন */
  getViewUrl(path) {
    const fullUrl = this.getUrl(path);
    if (this.viewer.mode === 'google') {
      return `${this.viewer.googleViewerUrl}${encodeURIComponent(fullUrl)}&embedded=true`;
    }
    return fullUrl;
  },

  /* PDF ডাউনলোড ফাংশন */
  download(path, filename) {
    const url = this.getUrl(path);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || path.split('/').pop();
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
