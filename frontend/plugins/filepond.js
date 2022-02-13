import Vue from 'vue';

// Import Vue FilePond
import vueFilePond from 'vue-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import FilePond plugins
// import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
// import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Import image preview plugin styles
// import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';


// Create component
const FilePond = vueFilePond(
  // FilePondPluginImageCrop,
  // FilePondPluginImageEdit,
  FilePondPluginImagePreview,
  // FilePondPluginImageTransform,
  FilePondPluginFileValidateType,
);

Vue.component(FilePond)
