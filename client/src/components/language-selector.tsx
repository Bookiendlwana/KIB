import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
  { code: 'st', name: 'Sesotho', flag: '🇿🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  { code: 'ny', name: 'Chinyanja', flag: '🇲🇼' },
  { code: 'sn', name: 'chiShona', flag: '🇿🇼' },
];

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Properly categorize languages using filter-based grouping
  const southAfricanLanguages = ['en', 'af', 'zu', 'xh', 'st'];
  const africanLanguages = ['sw', 'ny', 'sn'];
  const internationalLanguages = ['fr', 'pt'];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Set document language (all supported languages use LTR)
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = languageCode;
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          data-testid="language-selector"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="hidden md:inline">{currentLanguage.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 max-h-80 overflow-y-auto"
        data-testid="language-dropdown"
      >
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-b">
          {t('common.selectLanguage')}
        </div>
        
        {/* South African Languages */}
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b bg-muted/30">
          South African Languages
        </div>
        {languages.filter(lang => southAfricanLanguages.includes(lang.code)).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-between px-3 py-2 cursor-pointer ${
              currentLanguage.code === language.code ? 'bg-orange-primary/10 text-orange-primary' : ''
            }`}
            data-testid={`language-${language.code}`}
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {currentLanguage.code === language.code && (
              <span className="text-orange-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
        
        {/* African Languages */}
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b bg-muted/30">
          African Languages
        </div>
        {languages.filter(lang => africanLanguages.includes(lang.code)).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-between px-3 py-2 cursor-pointer ${
              currentLanguage.code === language.code ? 'bg-orange-primary/10 text-orange-primary' : ''
            }`}
            data-testid={`language-${language.code}`}
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {currentLanguage.code === language.code && (
              <span className="text-orange-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
        
        {/* International Languages */}
        <div className="px-2 py-1 text-xs font-medium text-muted-foreground border-b bg-muted/30">
          International Languages
        </div>
        {languages.filter(lang => internationalLanguages.includes(lang.code)).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center justify-between px-3 py-2 cursor-pointer ${
              currentLanguage.code === language.code ? 'bg-orange-primary/10 text-orange-primary' : ''
            }`}
            data-testid={`language-${language.code}`}
          >
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
            {currentLanguage.code === language.code && (
              <span className="text-orange-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}