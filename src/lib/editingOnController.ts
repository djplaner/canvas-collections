/**
 * @file editingOnController.ts 
 * @description Ensure only one browser window can be editing Collections at a time
 * - Manage the creation of a "Canvas Collections - editing" Canvas page that contains the
 *   canvas user id and a unique browser session id identifying the person editing
 * Singleton class
 */


export class editingOnController {
    private static instance : editingOnController;
    private constructor(){}
    public static getInstance(): editingOnController {
        if(!editingOnController.instance){
            editingOnController.instance = new editingOnController();
        }
        return editingOnController.instance;
    }

	private myvariable: string = "hello world";

	public getMyVariable(): string {
		return this.myvariable;
	}

	public setMyVariable(value: string): void {
		this.myvariable = value;
	}
}