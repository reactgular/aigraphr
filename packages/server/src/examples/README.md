- some parameters don't have inputs, because they can't be dynamically changed (example: image type)
- some nodes can have variable number of inputs (example: merge node, output node)
- some nodes can have variable number of outputs
- some inputs could be of type any, which means they can accept any type of input
- some inputs could be an object interface, example a LLM model input

- parameters are organized into groups, which are displayed in the UI as tabs
- all inputs map to a parameter, but not all parameters map to an input