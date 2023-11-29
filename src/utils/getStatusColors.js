function getStatusColor(status) {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'greenyellow';
      case 'unknown':
        return 'bisque';
      case 'dead':
        return 'red';
      default:
        return 'black';
    }
  }
  export {getStatusColor}