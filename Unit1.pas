unit Unit1;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, System.Rtti,
  FMX.Grid.Style, Fmx.Bind.Grid, System.Bindings.Outputs, Fmx.Bind.Editors,
  Data.Bind.EngExt, Fmx.Bind.DBEngExt, Data.Bind.Components, Data.Bind.Grid,
  FMX.Controls.Presentation, FMX.ScrollBox, FMX.Grid, Data.Bind.DBScope,
  Data.DB, IBX.IBCustomDataSet, IBX.IBQuery, IBX.IBDatabase, FMX.StdCtrls;

type
  TForm1 = class(TForm)
    IBDatabase1: TIBDatabase;
    IBTransaction1: TIBTransaction;
    IBQuery1: TIBQuery;
    IBQuery1ARTYKUL_ID: TIntegerField;
    IBQuery1ARTYKUL_KOD: TIBStringField;
    IBQuery1ARTYKUL_OPIS: TIBStringField;
    IBQuery1REALIZACJA: TIBStringField;
    IBQuery1ILOSC_MAX: TFloatField;
    IBQuery1WGR_KOD: TIBStringField;
    IBQuery1ATTACHMENT: TSmallintField;
    BindSourceDB1: TBindSourceDB;
    GridBindSourceDB1: TGrid;
    LinkGridToDataSourceBindSourceDB1: TLinkGridToDataSource;
    BindingsList1: TBindingsList;
    Button1: TButton;
    procedure Button1Click(Sender: TObject);
  private
    { Private declarations }
  public
    { Public declarations }
  end;

var
  Form1: TForm1;

implementation

{$R *.fmx}

procedure TForm1.Button1Click(Sender: TObject);
begin
    IBQuery1.Open;
    IBQuery1.ParamByName('param1').AsInteger:=341;
    IBQuery1.ParamByName('param2').AsInteger:=1;
end;

end.
