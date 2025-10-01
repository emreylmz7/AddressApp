# Adres Yönetim Uygulaması

Bu proje, .NET Web API backend ve Angular frontend kullanılarak geliştirilmiş bir adres yönetim uygulamasıdır.

## Projeye Genel Bakış

Uygulama, kullanıcıların adresleri listelemesine, yeni adres eklemesine, mevcut adresleri düzenlemesine ve silmesine olanak tanır. Ayrıca, metin formatındaki adres listelerinin toplu olarak içeri aktarılmasını destekler.

## Kullanılan Teknolojiler

**Backend:**
* .NET 9 Web API
* Entity Framework Core (In-Memory Database)
* REST API Mimarisi

**Frontend:**
* Angular 18 (veya kullandığın sürüm)
* TypeScript
* Angular Standalone Components
* Angular Reactive Forms

## Kurulum ve Çalıştırma

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler
* [.NET SDK](https://dotnet.microsoft.com/download) (9.0 veya üzeri)
* [Node.js ve npm](https://nodejs.org/) (20.x veya üzeri)
* [Angular CLI](https://angular.io/cli)

### 1. Projeyi Klonlama
```bash
git clone https://github.com/emreylmz7/AddressApp.git
cd AddressApp
```

### 2. Backend'i Çalıştırma
```bash
cd backend/AddressApp.Api
dotnet restore
dotnet run
```
API, varsayılan olarak `https://localhost:7059` üzerinde çalışmaya başlayacaktır.

### 3. Frontend'i Çalıştırma
Yeni bir terminal açın:
```bash
cd frontend
npm install
ng serve
```
Uygulama, `http://localhost:4200/` adresinde açılacaktır.



