unit Unit11;

interface

uses
  System.SysUtils, System.Classes, Data.DB, IBX.IBDatabase;

type
  TDataModule11 = class(TDataModule)
    IBDatabase1: TIBDatabase;
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  DataModule11: TDataModule11;

implementation

{%CLASSGROUP 'FMX.Controls.TControl'}

{$R *.dfm}

end.
