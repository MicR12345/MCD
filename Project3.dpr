program Project3;

uses
  System.StartUpCopy,
  FMX.Forms,
  Unit4 in 'Unit4.pas' {Form4},
  Unit2 in 'Unit2.pas' {Form2},
  Unit6 in 'Unit6.pas' {Form6},
  Unit8 in 'Unit8.pas' {Form8},
  Unit9 in 'Unit9.pas' {Form9},
  Upoczekalnia in 'Upoczekalnia.pas' {FormPoczekalnia},
  UnitKoszyk in 'UnitKoszyk.pas' {KoszykForm},
  Unit11 in 'Unit11.pas' {DataModule11: TDataModule};

{$R *.res}

begin
  Application.Initialize;
  Application.CreateForm(TDataModule11, DataModule11);
  Application.CreateForm(TForm6, Form6);
  Application.Run;
end.
