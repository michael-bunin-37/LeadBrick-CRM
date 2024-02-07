export enum UserRole {
	// "USER" = "Користувач",
	// "EDITOR" = "Редактор",
	// "ADMIN" = "Адміністратор",
	"SUPER" = "Супер-Адмін*",
}

export type UserRoles = Array<keyof typeof UserRole>
export type UserModel = {
	uid: string
	displayName?: string | null
	role?: UserRoles[]
	photoURL?: string | null
	email?: string | null
}
