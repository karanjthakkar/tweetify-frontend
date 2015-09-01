import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    debugger;
    return `${this.get('host')}/scheduled_tweets`;
  },
  findQuery() {
    debugger;
  }
});
