export default function() {
  this.collection('contacts');
  this.collection('addresses', {belongsTo: 'contacts'});
}
