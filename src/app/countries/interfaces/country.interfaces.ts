export interface Country {
  name:         Name;
  cca2:         string;
  altSpellings: string[];
  borders:      string[];
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  aym: Aym;
  que: Aym;
  spa: Aym;
}

export interface Aym {
  official: string;
  common:   string;
}
