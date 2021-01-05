class Selector {
  constructor(id) {
    this.options = [];
    this.selectedOption = null;
    this.conditionId = id;
  }

  registerOption(newOption) {
    const { id: optionId } = newOption;
    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        throw new Error(`An option with id ${optionId} has already been registered for condition ${this.conditionId}.`);
      }
    }

    const previousOption = this.options[this.options.length - 1] || null;

    const currentOption = {
      previousOption,
      nextOption: null,
      ...newOption,
    };

    if (previousOption) {
      previousOption.nextOption = currentOption;
    }

    this.options.push(currentOption);

    // select the first option by default
    if (this.options.length === 1) {
      this.selectedOption = currentOption;
    }
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
