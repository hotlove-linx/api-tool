export interface TreeItem {
    id: string;
    type: string;
    name: string;
    method: string;
    status: string; // complete,edit,add
    oper: string;
    children: TreeItem[];
}