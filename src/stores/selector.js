class Selector {
  constructor() {
    this.options = [];
    this.selectedOptions = [];
  }

  get selectedOption() {
    return this.selectedOptions[0];
  }

  registerOption(newOption) {
    const { id: optionId } = newOption;
    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        throw new Error('An option with id ${optionId} has already been registered for this selector.');
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
  }

  isSelected(optionId) {
    let isSelected = false;
    this.selectedOptions.forEach((option) => {
      if (option.id === optionId) {
        isSelected = true;
      }
    })
    return isSelected;
  }

  findOption(optionId) {
    for (var i = 0; i < this.options.length; i++) {
      const currentOption = this.options[i];
      if (currentOption.id === optionId) {
        return currentOption;
      }
    }
    return null;
  }

  toggleOption(optionId) {
    if (this.isSelected(optionId)) {
      return this.deselectOption(optionId);
    } else {
      return this.selectedOption(optionId);
    }
  }

  clearSelectedOptions() {
    this.selectedOptions.splice(0, this.selectedOptions.length)
  }

  deselectOption(optionId) {
    this.selectedOptions = this.selectedOptions.filter((option) => {
      option.id !== optionId;
    });
  }

  selectOption(optionId) {
    const option = this.findOption(optionId);

    if (!this.isSelected(optionId)) {
      this.selectedOptions.push(option);
      return option;
    }

    return option;
  }
}

export default Selector;
