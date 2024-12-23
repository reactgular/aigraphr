function workspaces() {
    function create() {
        function status(code: 201): void;
        function status(code: 200): void;
        function status(code: 404): void;
        function status(code: number): void {}

        return {status};
    }

    return {create};
}

const x = workspaces();
x.create().status(404);

export {workspaces};
