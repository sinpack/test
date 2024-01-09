1. # Difference between Component and PureComponent:

   - Component: The base class for React components. It re-renders whenever setState is called
   - PureComponent: A subclass of Component that performs a shallow comparison of current and next props and state, preventing unnecessary renders if the data hasn't changed. Example:

   Example where it might break: If the props or state contain complex objects and their references don't change, PureComponent might not re-render, leading to unexpected behavior if the object's internal state changes without updating the reference.

2. # Context + ShouldComponentUpdate might be dangerous:

   Functional components automatically re-render when the context changes, ensuring that the latest values are used while shouldComponentUpdate inside class components might potentially prevent re-rendering when the context might change/be updated

3. # Three ways to pass information from a component to its PARENT:
   - Callback Function: The child component receives a function as a prop from the parent, and the child invokes this function to pass information back.
     Context: indirect communication between components passing information through context.
4. # Two ways to prevent components from re-rendering:
   - Memoization: Use the React.memo higher-order component for functional components
   - Use useMemo and useCallback hooks
5. # What is a fragment and why do we need it?

   - Lightweight syntax in React that allows grouping multiple elements without adding an extra node to the DOM. It is represented by <>...</> or <React.Fragment>...</React.Fragment>.
     Why do we need it: We can avoid unnecessary DOM nesting (divs over divs over divs...)
   - May break the styling if the CSS selector relies on a specific parent-child relationship

6. Three examples of the HOC pattern:
   Redux's connect function
   withRouter
   withStyles from @material-ui/core/styles: Adds styles to a component using the Material-UI styling system.
7. # Difference in handling exceptions in promises, callbacks, and async...await:

   - Promises: Using .then().catch() to handle errors.
   - Callbacks: Errors are typically passed as the first argument to the callback function.
   - Async...Await: Using try-catch blocks to handle exceptions in a synchronous-like manner.

8. # How many arguments does setState take and why is it async:

   - setState takes 2 arguments: setState(updater, callback). It's async in order to be prevent unnecessary renders/performance reasons

9. # Steps needed to migrate a Class to Function Component:

   - Change class and use function instead
   - Remove render() method
   - Convert class methods to functions
     Replace the class-specific lifecycle methods with equivalent hooks (e.g., useEffect).
   - Replace this.state with useState hook.
   - Replace this.props with function arguments.

10. # Ways styles can be used with components:

- Inline Styles: Apply styles directly within the component using the style attribute. (either by style={{}} or conditionally passing classes using clsx library for example)
- CSS Modules: Import CSS files into components, with locally-scoped styles or globally-scoped styles.
- Styled-components: Use a popular CSS-in-JS library to write styles within JavaScript files.
  CSS-in-JS Libraries: Other libraries like Emotion or JSS offer alternative ways to manage styles.

11. # How to render an HTML string coming from the server:
    Using the dangerouslySetInnerHTML(equivalent innerHTML) prop
