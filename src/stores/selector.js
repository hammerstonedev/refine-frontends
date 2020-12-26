class Selector {
  constructor(id) {
    this.options = [];
    this.selectedOption = null;
    this.conditionId = id;
  }

  registerOption(newOption) {
    const { id: optionId } = newOption;
    let isOptionAlreadyRegistered = false;

    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        isOptionAlreadyRegistered = true;
        break;
      }
    }

    if (isOptionAlreadyRegistered) {
      throw new Error(`An option with id ${optionId} has already been registered for condition ${this.conditionId}.`);
    }

    this.options.push(newOption);
  }

  selectOption(optionId) {
    let option;
    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        option = currentOption;
           break;
      }
    }

    this.selectedOption = option;
    return option;
  }
}

export default Selector;
