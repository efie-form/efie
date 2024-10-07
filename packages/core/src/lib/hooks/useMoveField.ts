function useMoveField() {
  const registerProps = (id: string) => {
    const onDragStart = () => {
      console.log('onDragStart', id);
    };

    return {
      draggable: true,
      onDragStart,
    };
  };

  return {
    registerProps,
  };
}

export default useMoveField;
